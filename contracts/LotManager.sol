// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./EntityManager.sol";

contract LotManager {
    enum LotStatus { Pending, InProgress, Completed, Manufactured }
    address private _entityManager;

    struct Lot {
        string lotId;
        string productName;
        uint256 manufacturingDate;
        uint256 expirationDate; 
        string qualityCertifications;
        address currentHolder;
        LotStatus status;
        string qrCode;
        uint256 quantity;
        string[] components;
    }

    mapping(string => Lot) public lots;
    string[] public lotIds; // Tableau pour suivre les IDs des lots
    address public immutable owner;
    EntityManager private immutable entityManager;

    // Evenements
    event LotCreated(string indexed lotId, address indexed creator, string qrCode, uint256 quantity, string[] components);
    event LotTransferred(
        string indexed lotId,
        address indexed from,
        address indexed to,
        LotStatus status,
        uint256 quantity,
        uint256 timestamp
    );

    // Modificateur pour limiter l'acces au proprietaire
    modifier onlyOwner() {
        require(msg.sender == owner, "Seul le proprietaire peut appeler cette fonction");
        _;
    }

    // Modificateur pour verifier que l'adresse est une entite enregistree
    modifier onlyRegisteredEntity(address _address) {
        require(entityManager.isRegistered(_address), "Adresse non enregistree dans EntityManager");
        _;
    }

    // Modificateur pour verifier que le role est Manufacturer
    modifier onlyManufacturer() {
        (, EntityManager.Role role, ) = entityManager.getEntity(msg.sender);
        require(role == EntityManager.Role.Manufacturer, "Seul un fabricant peut creer des lots");
        _;
    }

    modifier onlyLotHolder(string memory _lotId) {
        require(lotExists(_lotId), "Le lot n'existe pas");
        require(lots[_lotId].currentHolder == msg.sender, "Vous n'etes pas le detenteur actuel du lot");
        _;
    }

    // Constructeur pour initialiser le proprietaire et l'adresse d'EntityManager
    constructor(address _entityManagerAddress) {
        require(_entityManagerAddress != address(0), "Adresse EntityManager invalide");
        owner = msg.sender;
        entityManager = EntityManager(_entityManagerAddress);
    }

    // Fonction pour creer un lot
    function createLot(
        string memory _lotId,
        string memory _productName,
        uint256 _manufacturingDate,
        uint256 _expirationDate,
        string memory _qualityCertifications,
        address _currentHolder,
        string memory _qrCode,
        uint256 _quantity,
        string[] memory _components
    ) public onlyManufacturer onlyRegisteredEntity(_currentHolder) {
        require(bytes(_lotId).length > 0, "ID du lot invalide");
        require(!lotExists(_lotId), "Le lot existe deja");
        require(_quantity > 0, "La quantite doit etre superieure a zero");
        require(_manufacturingDate <= block.timestamp, "La date de fabrication ne peut pas etre dans le futur");
        require(_expirationDate > _manufacturingDate, "La date d'expiration doit etre ulterieure a la date de fabrication");

        lots[_lotId] = Lot({
            lotId: _lotId,
            productName: _productName,
            manufacturingDate: _manufacturingDate,
            expirationDate: _expirationDate,
            qualityCertifications: _qualityCertifications,
            currentHolder: _currentHolder,
            status: LotStatus.Manufactured,
            qrCode: _qrCode,
            quantity: _quantity,
            components: _components
        });

        lotIds.push(_lotId); // Ajouter l'ID du lot au tableau

        emit LotCreated(_lotId, _currentHolder, _qrCode, _quantity, _components);
    }

    // Fonction pour transferer un lot
    function transferLot(
        string memory _lotId,
        address _to,
        LotStatus _status,
        uint256 _quantity
    ) public onlyRegisteredEntity(msg.sender) onlyRegisteredEntity(_to) onlyLotHolder(_lotId) {
        require(lotExists(_lotId), "Le lot n'existe pas");
        Lot storage lot = lots[_lotId];
        require(lot.quantity >= _quantity, "Quantite insuffisante dans le lot");
        require(_quantity > 0, "Quantite invalide pour le transfert");

        // Mise a jour du lot
        lot.quantity -= _quantity;
        if (lot.quantity == 0) {
            lot.currentHolder = _to;
            lot.status = _status;
        }

        emit LotTransferred(_lotId, msg.sender, _to, _status, _quantity, block.timestamp);
    }

    // Fonction pour recuperer les details d'un lot
    function getLot(string memory _lotId) public view returns (Lot memory) {
        require(lotExists(_lotId), "Le lot n'existe pas");
        return lots[_lotId];
    }

    // Fonction pour recuperer tous les lots
    function getAllLots() public view returns (Lot[] memory) {
        Lot[] memory allLots = new Lot[](lotIds.length);
        for (uint256 i = 0; i < lotIds.length; i++) {
            allLots[i] = lots[lotIds[i]];
        }
        return allLots;
    }

    // Fonction pour verifier l'existence d'un lot
    function lotExists(string memory _lotId) public view returns (bool) {
        return bytes(lots[_lotId].lotId).length > 0;
    }

    // Fonction pour supprimer un lot (si non transfert)
    function deleteLot(string memory _lotId) public onlyOwner {
        require(lotExists(_lotId), "Le lot n'existe pas");
        Lot storage lot = lots[_lotId];
        require(lot.status == LotStatus.Pending, "Le lot ne peut pas etre supprime une fois qu'il est en cours de fabrication ou transfere");

        // Supprimer du tableau lotIds
        for (uint256 i = 0; i < lotIds.length; i++) {
            if (keccak256(bytes(lotIds[i])) == keccak256(bytes(_lotId))) {
                lotIds[i] = lotIds[lotIds.length - 1];
                lotIds.pop();
                break;
            }
        }

        delete lots[_lotId];
    }
}
