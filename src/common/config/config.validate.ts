import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export const configValidate =
  (rule: ClassConstructor<object>) => (config: Record<string, unknown>) => {
    const validatedConfig = plainToInstance(rule, config, {
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
