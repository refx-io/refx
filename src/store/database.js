
const User = [
  {
    "first_name": "Michael",
    "address": "0x884f350523Ec1435C2261dC7Aa2cDb4553dF97Dd",
    "nullifier_hash": "0x088e0c0b6edf80efcf6bd69c2ebe527195784974faa28d56463da95f17efd7c2",
    "references": [],
    "label": "Identity #4"
  },
  {
    "first_name": "Tony",
    "address": "0x884f350523Ec1435C2261dC7Aa2cDb4553dF97Dd",
    "nullifier_hash": "0x17f35495dcbba250e0f8d627f331077d68bedd182be9b99a6630bcb022b3af22",
    "references": [],
    "label": "Identity #2"
  }
];

export const Company = [
  {
    "name": "Westpac",
    "address": "0xc5469483FBE5F33D1d3B5A1d08Cd36273BD188db",
    "requests": []
  }
]

const DB = {
  user: User,
  insertNewRequest: (employeeHash, employerAddress) => {
    console.log('lookup employee', employeeHash);
    const employee = DB.user.find(it => it.nullifier_hash === employeeHash);
    const employer = DB.company.find(it => it.address === employerAddress);
    if (!employer) {
      alert('Cannot find such company address');
      return
    }
    console.log('insert new request', employee, employer);
    if (employee && employer) {
      const existingRequest = employer.requests.find(it => it.employeeHash === employeeHash);
      if (!existingRequest) {
        employer.requests.push({employeeHash: employeeHash, employeeAddress: employee.address, address: "", verified: false});
      }

      const existingReference = employee.references.find(it => it.employer === employerAddress)
      if (!existingReference) {
        employee.references.push({employer: employerAddress, address: "", verified: false});
      }
    }
  },

  loadAllReferences: (employeeHash) => {
    console.log('loadAllReferences', employeeHash, DB.user)
    const element = DB.user.find(it => it.nullifier_hash === employeeHash);
    return element ? [...element.references] : [];
  },

  lookupEmployeeByHash: (hash) => {
    return DB.user.find(it => it.nullifier_hash === hash);
  },

  company: Company,
  loadAllPendingRequests: (address) => {
    console.log('lookup pending request', address)
    const element = DB.company.find(it => it.address === address);
    return element ? [...element.requests] : [];
  },

  approveCheck: (request, address) => {
    const employee = DB.user.find(it => it.nullifier_hash === request.employeeHash);
    const employer = DB.company.find(it => it.address === request.employer);
    console.log('employee', employee);
    console.log('employer', employer);
    console.log('address', address);

    if (employee && employer) {
      const existingRequest = employer.requests.find(it => it.employeeHash === request.employeeHash);
      console.log('existingRequest', existingRequest);

      console.log('existingRequests 1', employer);
      if (existingRequest) {
        existingRequest.address = address;
        existingRequest.verified = true;
      }
      console.log('existingRequests 1', employer);

      const existingReference = employee.references.find(it => it.employer === request.employer)

      console.log('existingReference 1', employee);
      if (existingReference) {
        existingReference.address = address;
        existingReference.verified = true;
      }
      console.log('existingReference 2', employee);
    }
  }
};

export default DB;
