import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import ConfigRule from './config.rule';

export const configValidate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToInstance(ConfigRule, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
};
