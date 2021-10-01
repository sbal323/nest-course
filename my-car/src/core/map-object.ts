export function mapObject<T> (target: T, source: object)
{
    Object.getOwnPropertyNames(target).forEach((key) => {
      target[key] = source[key];
    })
 }
