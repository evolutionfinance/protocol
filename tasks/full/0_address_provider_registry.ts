import { task } from 'hardhat/config';
import { deployLendingPoolAddressesProviderRegistry } from '../../helpers/contracts-deployments';
import { getFirstSigner } from '../../helpers/contracts-getters';

task('full:deploy-address-provider-registry', 'Deploy address provider registry')
  .addFlag('verify', 'Verify contracts at Etherscan')
  .setAction(async ({ verify }, DRE) => {
    await DRE.run('set-DRE');
    //console.log(await getFirstSigner())
    const contract = await deployLendingPoolAddressesProviderRegistry(verify);
    console.log('Registry Address:', contract.address);
  });
