#!/usr/bin/env node

import { validateArguments } from './args/validate-file-arguments';
import {
  displayError,
  displaySuccess,
} from '../logic/cli/console/console.messages';
import { generateTypesFromFile } from '../workflows/generate-types-from-file';

/* istanbul ignore file */

(async (): Promise<void> => {
  try {
    const args = validateArguments();

    const generationResult = await generateTypesFromFile(args);

    displaySuccess(args.outputPath, generationResult);
    process.exit(0);
  } catch (err) {
    displayError(err);
    process.exit(1);
  }
})();
