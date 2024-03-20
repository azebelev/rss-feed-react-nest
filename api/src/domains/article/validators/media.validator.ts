import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, isString, IsUrl, IsNumber } from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsValidMedia implements ValidatorConstraintInterface {
  validate(media: any, args: ValidationArguments) {
    if (
      !isString(media.type) ||
      !isString(media.url) ||
      !IsUrl(media.url) ||
      !isString(media.credit) ||
      !IsNumber(media.height) ||
      !IsNumber(media.width)
    ) {
      return false;
    }
    return true;
  }
  defaultMessage() {
    return 'Media object is invalid';
  }
}