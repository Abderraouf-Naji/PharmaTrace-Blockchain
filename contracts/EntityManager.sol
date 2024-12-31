// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EntityManager {
    enum Role { Admin, Manufacturer, Distributor, Pharmacy }

    struct Entity {
        string name;
        Role role; 
        address account;
    }

    mapping(address => Entity) private entities;
    mapping(address => bool) private registeredEntities;
    address[] private entityAddresses;

    // Adresse de l'administrateur initial
    address public admin;

    // Evenements
    event EntityRegistered(address indexed entityAddress, string name, Role role);
    event AdminUpdated(address indexed oldAdmin, address indexed newAdmin);
    event EntityRemoved(address indexed entityAddress, bool success);

    // Modificateur pour restreindre l'acces a l'administrateur
    modifier onlyAdmin() {
        require(msg.sender == admin, "Acces reserve a l'administrateur");
        _;
    }

    // Constructeur pour initialiser l'administrateur
    constructor() {
        admin = msg.sender;
        emit AdminUpdated(address(0), msg.sender);
    }

    // Mettre a jour l'administrateur
    function updateAdmin(address _newAdmin) external onlyAdmin {
        require(_newAdmin != address(0), "Adresse invalide pour le nouvel administrateur");
        emit AdminUpdated(admin, _newAdmin);
        admin = _newAdmin;
    }

    // Enregistrer une nouvelle entite
    function registerEntity(string memory _name, Role _role, address _entityAddress) public onlyAdmin {
        require(_entityAddress != address(0), "Adresse invalide");
        require(!registeredEntities[_entityAddress], "Entite deja enregistree");

        entities[_entityAddress] = Entity(_name, _role, _entityAddress);
        registeredEntities[_entityAddress] = true;
        entityAddresses.push(_entityAddress);

        emit EntityRegistered(_entityAddress, _name, _role);
    }

    // Verifier si une entite est enregistree
    function isRegistered(address _entityAddress) public view returns (bool) {
        return registeredEntities[_entityAddress];
    }

    // Recuperer les details d'une entite
    function getEntity(address _entityAddress) public view returns (string memory name, Role role, address account) {
        require(isRegistered(_entityAddress), "Entite non enregistree");
        Entity memory entity = entities[_entityAddress];
        return (entity.name, entity.role, entity.account);
    }

    // Recuperer toutes les entites enregistrees
    function getAllEntities() public view returns (Entity[] memory) {
        Entity[] memory allEntities = new Entity[](entityAddresses.length);
        for (uint i = 0; i < entityAddresses.length; i++) {
            allEntities[i] = entities[entityAddresses[i]];
        }
        return allEntities;
    }

    // Recuperer toutes les entites par role
    function getEntitiesByRole(Role _role) public view returns (Entity[] memory) {
        uint count = 0;

        // Compter les entites correspondantes
        for (uint i = 0; i < entityAddresses.length; i++) {
            if (entities[entityAddresses[i]].role == _role) {
                count++;
            }
        }

        // Construire le tableau des entites filtrees
        Entity[] memory filteredEntities = new Entity[](count);
        uint index = 0;
        for (uint i = 0; i < entityAddresses.length; i++) {
            if (entities[entityAddresses[i]].role == _role) {
                filteredEntities[index] = entities[entityAddresses[i]];
                index++;
            }
        }

        return filteredEntities;
    }

    // Recuperer tous les fabricants
    function getAllManufacturers() public view returns (Entity[] memory) {
        return getEntitiesByRole(Role.Manufacturer);
    }

    // Recuperer tous les distributeurs
    function getAllDistributors() public view returns (Entity[] memory) {
        return getEntitiesByRole(Role.Distributor);
    }

    // Recuperer toutes les pharmacies
    function getAllPharmacies() public view returns (Entity[] memory) {
        return getEntitiesByRole(Role.Pharmacy);
    }

    // Supprimer une entite
    function removeEntity(address _entityAddress) public onlyAdmin {
        require(isRegistered(_entityAddress), "Entite non enregistree");

        // Supprimer l'entite du mapping et marquer comme non enregistree
        delete entities[_entityAddress];
        registeredEntities[_entityAddress] = false;

        // Supprimer l'adresse de l'entite du tableau
        for (uint i = 0; i < entityAddresses.length; i++) {
            if (entityAddresses[i] == _entityAddress) {
                entityAddresses[i] = entityAddresses[entityAddresses.length - 1];
                entityAddresses.pop();
                emit EntityRemoved(_entityAddress, true);
                return;
            }
        }

        emit EntityRemoved(_entityAddress, false); // Si suppression echoue
    }
}
