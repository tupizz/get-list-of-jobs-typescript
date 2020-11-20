import * as Joi from 'joi';

export const payloadSchema = Joi.object({
  'ID': Joi.number().required(),
  'Descrição': Joi.string().required(),
  'Data Máxima de conclusão': Joi.string()
    .pattern(new RegExp(/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/))
    .required(),
  'Tempo estimado': Joi.string()
    .pattern(new RegExp(/[0-9]{1} horas/))
    .required(),
});
