import { Property } from '../types/property';
export declare const getProperties: () => Promise<Property[]>;
export declare const addProperty: (property: Property) => Promise<string>;
export declare const getPropertyById: (id: string) => Promise<Property>;
export declare const editPropertyById: (id: string, updates: Partial<Property>) => Promise<void>;
export declare const deletePropertyById: (id: string) => Promise<void>;
