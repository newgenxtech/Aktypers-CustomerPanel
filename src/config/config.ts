// import { environment } from '@/environments/development.environment'
// import { environment } from "../environments/testing.environment"
import { environment } from "../environments/production.environment"

export const currentEnvironment = environment

export const base = currentEnvironment.api.url