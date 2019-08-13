/**
 * Default configuration.
 *
 */

const defaultConfig = {
  
  IdentityRegistry: {
    address: '0x39aeEe8C35e3BDF394D01e7a9Dab7406C385C61D',
    abi: [
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "registry",
      "outputs": [
        {
          "name": "",
          "type": "bytes"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x038defd7"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x715018a6"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x8da5cb5b"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "isOwner",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x8f32d59b"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xf2fde38b"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event",
      "signature": "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_id",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_metadata",
          "type": "bytes"
        }
      ],
      "name": "Add",
      "type": "event",
      "signature": "0x3ae15370f610a749f13a34143e806250bb57429490bc286bc4ad0d62d681b167"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_id",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_metadata",
          "type": "bytes"
        }
      ],
      "name": "Remove",
      "type": "event",
      "signature": "0xbdcd99ab14b163a4dad6ebffc4e2452d7366d9bc8e3629d7dc083976c59bd0c5"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_id",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_oldMetadata",
          "type": "bytes"
        },
        {
          "indexed": true,
          "name": "_newMetadata",
          "type": "bytes"
        }
      ],
      "name": "Update",
      "type": "event",
      "signature": "0x1f8a3ece3ed2f0c4bf6d88ac6fbc4ba6de238d892adeba14ac7228029e24dde8"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "id",
          "type": "address"
        },
        {
          "name": "metadata",
          "type": "bytes"
        }
      ],
      "name": "add",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x0b2acb3f"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "id",
          "type": "address"
        }
      ],
      "name": "remove",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x29092d0e"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "id",
          "type": "address"
        },
        {
          "name": "metadata",
          "type": "bytes"
        }
      ],
      "name": "update",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x02a688ed"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "removeSelf",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x5e898dac"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "id",
          "type": "address"
        }
      ],
      "name": "isHuman",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xf72c436f"
    }
  ]
  }
};

module.exports = defaultConfig;
