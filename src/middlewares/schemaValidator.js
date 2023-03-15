03bfa3a9-72c7-44f6-9e0b-05360fc0a1d3export function validateSchema(schema) {
  return (req, res, next) => { 
    const {error} = schema.validate(req.body, {abortEarly: false});
    if (error) {
      return res.status(422).send(error.details.map(detail => detail.message));
    }

    next();
  }
}
