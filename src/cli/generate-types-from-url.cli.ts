#!/usr/bin/env node

import {
  displayError,
  displaySuccess,
} from '../logic/cli/console/console.messages';
import { generateTypesFromUrl } from '../workflows/generate-types-from-url';

import { validateArguments } from './args/validate-url-arguments';

/* istanbul ignore file */

(async (): Promise<void> => {
  try {
    const args = validateArguments();

    const generationResult = await generateTypesFromUrl(args);

    displaySuccess(args.outputPath, generationResult);
    process.exit(0);
  } catch (err) {
    displayError(err);
    process.exit(1);
  }
})();
