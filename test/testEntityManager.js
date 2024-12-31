const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Lock contract", function () {
  it("Should set the right unlockTime", async function () {
    const [owner] = await ethers.getSigners(); // Get the account to interact with
    const Lock = await ethers.getContractFactory("Lock");
    const lock = await Lock.deploy();
    await lock.deployed();

    // Assuming you want to check unlockTime is set properly after deployment
    const unlockTime = await lock.unlockTime();
    expect(unlockTime).to.be.gt(0); // Check if unlockTime is greater than 0
  });
});

describe("EntityManager", function () {
  let entityManager;
  let admin;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // Get the signers (addresses)
    [admin, addr1, addr2] = await ethers.getSigners();

    // Deploy the EntityManager contract
    const EntityManager = await ethers.getContractFactory("EntityManager");
    entityManager = await EntityManager.deploy();
    await entityManager.deployed();
  });

  it("should deploy the contract and set the admin", async function () {
    // Check if the admin is set correctly
    expect(await entityManager.admin()).to.equal(admin.address);
  });

  it("should allow the admin to register an entity", async function () {
    const name = "Pharmacy A";
    const role = 3; // Role.Pharmacy
    await entityManager.registerEntity(name, role, addr1.address);

    // Check if the entity is registered
    const [entityName, entityRole, entityAccount] = await entityManager.getEntity(addr1.address);
    expect(entityName).to.equal(name);
    expect(entityRole).to.equal(role);
    expect(entityAccount).to.equal(addr1.address);
  });

  it("should not allow non-admins to register an entity", async function () {
    const name = "Manufacturer A";
    const role = 1; // Role.Manufacturer
    await expect(
      entityManager.connect(addr1).registerEntity(name, role, addr2.address)
    ).to.be.revertedWith("Acces reserve a l'administrateur");
  });

  it("should allow the admin to remove an entity", async function () {
    const name = "Pharmacy B";
    const role = 3; // Role.Pharmacy
    await entityManager.registerEntity(name, role, addr1.address);

    // Remove the entity
    await entityManager.removeEntity(addr1.address);

    // Check if the entity is removed
    await expect(
      entityManager.getEntity(addr1.address)
    ).to.be.revertedWith("Entite non enregistree");
  });

  it("should allow admin to update the admin address", async function () {
    const newAdmin = addr1.address;
    await entityManager.updateAdmin(newAdmin);

    // Check if the admin address has been updated
    expect(await entityManager.admin()).to.equal(newAdmin);
  });

  it("should return entities filtered by role", async function () {
    const name1 = "Pharmacy A";
    const role1 = 3; // Role.Pharmacy
    const name2 = "Manufacturer A";
    const role2 = 1; // Role.Manufacturer
    await entityManager.registerEntity(name1, role1, addr1.address);
    await entityManager.registerEntity(name2, role2, addr2.address);

    // Get all pharmacies
    const pharmacies = await entityManager.getAllPharmacies();
    expect(pharmacies.length).to.equal(1);
    expect(pharmacies[0].name).to.equal(name1);
  });

  it("should emit events correctly", async function () {
    const name = "Pharmacy C";
    const role = 3; // Role.Pharmacy

    // Listen for the event
    await expect(entityManager.registerEntity(name, role, addr1.address))
      .to.emit(entityManager, "EntityRegistered")
      .withArgs(addr1.address, name, role);

    await expect(entityManager.removeEntity(addr1.address))
      .to.emit(entityManager, "EntityRemoved")
      .withArgs(addr1.address, true);
  });
});
