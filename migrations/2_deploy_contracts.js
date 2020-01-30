const TomoValidator = artifacts.require('./TomoValidator');
const TomoRandomize = artifacts.require('./TomoRandomize');
const BlockSigner = artifacts.require('./BlockSigner');

const config = require('config');
minVoterCap = minCandidateCap = maxValidatorNumber = candidateWithdrawDelay = voterWithdrawDelay = epochNumber = blockTimeSecret = blockTimeOpening = 0;
if (config.has('truffle')){
    minCandidateCap = config.get('truffle.minCandidateCap');
    minVoterCap = config.get('truffle.minVoterCap');
    maxValidatorNumber = config.get('truffle.maxValidatorNumber');
    candidateWithdrawDelay = config.get('truffle.candidateWithdrawDelay');
    voterWithdrawDelay = config.get('truffle.voterWithdrawDelay');
    epochNumber = config.get('truffle.epochNumber');
}

module.exports = function(deployer) {

    let candidates = [
        '0x699a4f11c263f44f81cb59959c2e8ac97c81708c',
        '0x5e012b85e7015eed374f3e3f888c72f94bc5f041',
        '0x635154d0707db22bee136256588ed23659b4c3a3'
    ]
    let caps = [
        '50000000000000000000000',
        '50000000000000000000000',
        '50000000000000000000000'
    ]
    let firstOwner = '0xe4fe4385cebf8066f8e0df6c399c1f2ed94bf66d'
    return deployer.deploy(TomoValidator, candidates, caps, firstOwner, minCandidateCap, minVoterCap, maxValidatorNumber, candidateWithdrawDelay, voterWithdrawDelay).then((tv) => {
        return  deployer.deploy(TomoRandomize)
    }). then(() => {
        return deployer.deploy(BlockSigner, epochNumber);
    })
};
