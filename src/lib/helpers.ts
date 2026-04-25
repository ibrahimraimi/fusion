export const removeSongExtraText = (song: string) => {
	return song
		.replace(/\s\([^()]*\)/g, "")
		.trim()
		.split(" - ")[0]
		.replace(/\s\[[^\]]*\]/g, "");
};

export const slugify = (str: string) => {
	return (
		str
			.normalize("NFKD") // split accented characters into their base characters and diacritical marks
			.replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
			.trim() // trim leading or trailing whitespace
			.toLowerCase() // convert to lowercase
			// remove . , " ' “ ” ‘ ’ # ! $ %  & * ; : = _ ` ~ @ < > + | { } ( ) [ ] ^ *
			.replace(/[.,"'“”‘’#!?$%&%;:=_`~@<>+|{}()[\]\^\*]/g, "")
			.replace(/\/+/g, "-") // replace forward slashes with hyphens
			.replace(/\s+/g, "-") // replace spaces with hyphens
			.replace(/-+/g, "-") // remove consecutive hyphens
	);
};

export const slugifyCover = (name: string, artist: string) => {
	const slug = `${slugify(removeSongExtraText(name))}-${slugify(artist)}`;
	return slug;
};
