// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./EntityManager.sol";
import "./LotManager.sol";

contract SupplyChainManager {
    EntityManager public entityManager;
    LotManager public lotManager;

    enum Role { Admin, Manufacturer, Distributor, Pharmacy }
    mapping(address => Role) public entityRoles;

    // Constructeur pour initialiser les contrats EntityManager et LotManager
    constructor(address _entityManager, address _lotManager) {
        require(_entityManager != address(0), "Invalid EntityManager address");
        require(_lotManager != address(0), "Invalid LotManager address");

        entityManager = EntityManager(_entityManager);
        lotManager = LotManager(_lotManager);
    }

    // Convertir une chaine de caractere en Role enum
    function stringToRole(string memory _role) internal pure returns (Role) {
        if (keccak256(abi.encodePacked(_role)) == keccak256(abi.encodePacked("Admin"))) {
            return Role.Admin;
        } else if (keccak256(abi.encodePacked(_role)) == keccak256(abi.encodePacked("Manufacturer"))) {
            return Role.Manufacturer;
        } else if (keccak256(abi.encodePacked(_role)) == keccak256(abi.encodePacked("Distributor"))) {
            return Role.Distributor;
        } else if (keccak256(abi.encodePacked(_role)) == keccak256(abi.encodePacked("Pharmacy"))) {
            return Role.Pharmacy;
        } else {
            revert("Unknown role");
        }
    }

    // Convertir une chaine de caractere en LotStatus (LotManager)
    function stringToLotStatus(string memory _status) internal pure returns (LotManager.LotStatus) {
        if (keccak256(abi.encodePacked(_status)) == keccak256(abi.encodePacked("Pending"))) {
            return LotManager.LotStatus.Pending;
        } else if (keccak256(abi.encodePacked(_status)) == keccak256(abi.encodePacked("InProgress"))) {
            return LotManager.LotStatus.InProgress;
        } else if (keccak256(abi.encodePacked(_status)) == keccak256(abi.encodePacked("Completed"))) {
            return LotManager.LotStatus.Completed;
        } else if (keccak256(abi.encodePacked(_status)) == keccak256(abi.encodePacked("Manufactured"))) {
            return LotManager.LotStatus.Manufactured;
        } else {
            revert("Invalid status");
        }
    }

    // Enregistrer une entite (admin uniquement)
    function registerEntity(
        string memory _name,
        Role role,
        address _entityAddress
    ) public {
        require(entityRoles[msg.sender] == Role.Admin, "Only Admin can register entities");
        require(_entityAddress != address(0), "Invalid entity address");

        entityManager.registerEntity(_name, convertRole(role), _entityAddress); // Enregistrement via EntityManager
        entityRoles[_entityAddress] = role;
    }

    // Convertir un Role enum en Role de EntityManager
    function convertRole(Role _role) internal pure returns (EntityManager.Role) {
        if (_role == Role.Admin) return EntityManager.Role.Admin;
        if (_role == Role.Manufacturer) return EntityManager.Role.Manufacturer;
        if (_role == Role.Distributor) return EntityManager.Role.Distributor;
        if (_role == Role.Pharmacy) return EntityManager.Role.Pharmacy;

        revert("Invalid role conversion");
    }

    // Fonction de creation d'un lot (uniquement par un Manufacturer)
function createLot(
    string memory _lotId,
        string memory _productName,
        uint256 _manufacturingDate,
        uint256 _expirationDate,
        string memory _qualityCertifications,
        string memory _qrCode,
        uint256 _quantity,
        string[] memory _components
) public {
    require(entityRoles[msg.sender] == Role.Manufacturer, "Only a manufacturer can create a lot");
    require(entityManager.isRegistered(msg.sender), "Entity is not registered");

    // Appel de createLot avec le paramètre _components
    lotManager.createLot(
        _lotId,
        _productName,
        _manufacturingDate,
        _expirationDate,
        _qualityCertifications,
        msg.sender,
        _qrCode,
        _quantity,
        _components 
    );
}


    // Fonction pour transferer un lot (par Manufacturer ou Distributor)
    function transferLot(
        string memory _lotId,
        address _to,
        string memory _status,
        uint256 _quantity
    ) public {
        require(
            entityRoles[msg.sender] == Role.Manufacturer || entityRoles[msg.sender] == Role.Distributor,
            "Only Manufacturer or Distributor can transfer a lot"
        );
        require(entityManager.isRegistered(msg.sender), "Sender is not registered");
        require(entityManager.isRegistered(_to), "Recipient is not registered");

        // Convertir le statut en LotStatus (LotManager)
        LotManager.LotStatus status = stringToLotStatus(_status);

        // Appel a la fonction transferLot du LotManager
        lotManager.transferLot(_lotId, _to, status, _quantity);
    }
}
