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
        '0x1e56eaa93778996a9e3fae74c297121ac1683bfb',
        '0x86772842b795c455a7ad87676795ae298d8d73ed',
        '0x0aab66ed764880331e2c2abe2524ad5ee9e84731'
    ]
    let caps = [
        '500000000000000000000000',
        '500000000000000000000000',
        '500000000000000000000000'
    ]
    let firstOwner = '0x99e39cb1819b9676391b34b7e8e321599157c65'
    return deployer.deploy(TomoValidator, candidates, caps, firstOwner, minCandidateCap, minVoterCap, maxValidatorNumber, candidateWithdrawDelay, voterWithdrawDelay).then((tv) => {
        return  deployer.deploy(TomoRandomize)
    }). then(() => {
        return deployer.deploy(BlockSigner, epochNumber);
    })
};
