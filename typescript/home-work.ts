enum Genre {
	Fiction = "Fiction",
	NonFiction = "NonFiction",
	Biography = "Biography",
	ScienceFiction = "ScienceFiction",
	Fantasy = "Fantasy"
}

type Book = {
	title: string;
	author: string;
	publishedDate: Date;
	available: boolean;
	genre: Genre;
};

const addBook = (books: Book[], newBook: Book): Book[] => {
	return [...books, newBook];
};

const searchByGenre = (books: Book[], genre: Genre): Book[] => {
	return books.filter(book => book.genre === genre);
};

const updateAvailability = (books: Book[], title: string, available: boolean): Book[] => {
	return books.map(book =>
		book.title === title ? {...book, available} : book
	);
};

interface BaseUser {
	id: number;
	username: string;
	email: string;
}

interface GuestUser extends BaseUser {
	guestSessionId: string;
}

interface RegisteredUser extends BaseUser {
	profile: string;
	lastLogin: Date;
}

type User = GuestUser | RegisteredUser;

const displayUserInfo = (user: User): void => {
	if ("guestSessionId" in user) {
		console.log(user.guestSessionId);
	} else if ("profile" in user) {
		console.log(user.profile);
	}
};

const updateUserProfile = (user: User, update: { profile: string }): User => {
	if ("profile" in user) {
		return {...user, profile: update.profile};
	}
	return user;
};