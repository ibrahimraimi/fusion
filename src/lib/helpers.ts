export const removeSongExtraText = (song: string) => {
	const songNoExtras = song
		// Remove parentheses from songs *if* they have a space beforehand
		// MATCH: "Crazy in Love (feat. Jay-Z)" -> "Crazy in Love"
		// DO NOT MATCH: "(I Can't Get No) Satisfaction"
		.replace(/\s\([^()]*\)/g, "")
		.trim()
		// Remove everything after a ' - ' in the song name
		// "Can't Get You out of My Head - Live at KEXP" -> "Can't Get You out of My Head"
		.split(" - ")[0]
		// Remove bracketed text
		// "What Was I Made For? [From The Motion Picture "Barbie"]" -> "What Was I Made For?"
		.replace(/\s\[[^\]]*\]/g, "");

	return songNoExtras;
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
