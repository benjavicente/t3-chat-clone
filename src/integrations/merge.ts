import {
	type DeepMergeBuiltInMetaData,
	type DeepMergeFunctionsDefaultURIs,
	type DeepMergeHKT,
	deepmergeCustom,
} from "deepmerge-ts";

export type MergeTwo<A, B> = DeepMergeHKT<[A, B], DeepMergeFunctionsDefaultURIs, DeepMergeBuiltInMetaData>;

export const merge = deepmergeCustom({
	// mergeArrays: false,
	// mergeMaps: false,
	// mergeSets: false,
});
