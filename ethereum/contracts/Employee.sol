// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

contract Employee {

    // The address of this employee
    address public owner;

    // The unique hash of this employee on Worlccoin
    string public nullifier_hash;

    struct ReferenceCheckResult {
        bool _verified;
    }

    mapping(address => ReferenceCheckResult) public referenceCheckHistory;

    constructor(string memory _nullifier_hash) {
        nullifier_hash = _nullifier_hash;
        owner = msg.sender;
    }

    // invoke by the employee
    function submitRequest(address companyAddress) public {
        Employer employer = Employer(companyAddress);
        bool isValidEmployerInstance = address(employer) == companyAddress;
        require(isValidEmployerInstance, "Invalid employer instance");

        employer.newRequest(owner, nullifier_hash);
        referenceCheckHistory[companyAddress] = ReferenceCheckResult({
            _verified: false
        });
    }

    // invoke by the employer
    function storeResult(address companyAddress, bool verified) public {
        referenceCheckHistory[companyAddress]._verified = verified;
    }
}

contract Employer {
    // The address of this employer
    address public owner;

    // Struct to represent the data structure of reference check request
    struct ReferenceCheckRequest {
        string _nullifier_hash;
        address _employee;
        bool _verified;
    }
    // the mapping between requester and requester's data (including _nullifier_hash)
    mapping(address => ReferenceCheckRequest) public pendingRequests;

    constructor() {
        owner = msg.sender;
    }

    function newRequest(address requester, string memory nullifier_hash ) public {
        Employee employee = Employee(requester);
        bool isValidEmployeeInstance = address(employee) == requester;
        require(isValidEmployeeInstance, "Invalid employee instance");

        require(!isKeyExists(requester), "You already submit reference check request");

        pendingRequests[requester] = ReferenceCheckRequest({
            _nullifier_hash: nullifier_hash,
            _employee: requester,
            _verified: false
        });
    }

    function approve(address requesterAddress) public {
        require(msg.sender == owner, "Only company owner can approve");
        require(isKeyExists(requesterAddress), "No reference check request from this address");

        Employee employee = Employee(requesterAddress);
        employee.storeResult(msg.sender, true);

        delete pendingRequests[requesterAddress];
    }

    function decline(address requesterAddress) public {
        require(msg.sender == owner, "Only company owner can decline");
        require(isKeyExists(requesterAddress), "No reference check request from this address");

        Employee employee = Employee(requesterAddress);
        employee.storeResult(msg.sender, false);

        delete pendingRequests[requesterAddress];
    }

    function isKeyExists(address _key) public view returns (bool) {
        return keccak256(abi.encodePacked(pendingRequests[_key]._nullifier_hash)) != keccak256("");
    }
}
