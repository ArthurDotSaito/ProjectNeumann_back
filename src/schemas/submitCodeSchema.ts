import Joi from 'joi';
import { SubmitCodeData } from '@/protocols';

export const submitCodeSchema = Joi.object<SubmitCodeData>({
	language_id: Joi.string().required(),
	source_code: Joi.string().required(),
	stdin: Joi.string().required(),
});
