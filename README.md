# Diolingo API
Personal project to save my Japanese vocabulary and exercise with minigames.
> In the future I might do a full user system in order to make the app usable for anyone.
> Routing below.
> Sorry, Swagger is painful.

## /auth

 - /login (**POST**)
 > Returns the user data and a new JWT.
 > Data sent via body. (Schema for body at /src/components/auth/auth.ts)
 - /register (**POST**)
 > Currently disabled.

## /kanji

- / (**GET**)
> Returns a list of kanjis. 
> Accepts query params. (Schema for query params at /src/components/kanji/kanji.ts)
- / (**POST**)
> Creates a new kanji.
> Data sent via body. (Schema for body at /src/components/kanji/kanji.ts)
> **JWT required in headers.**
- /:id (**GET**)
> Returns a single kanji by id.
- /:id (**PATCH**)
> Updates a kanji by id.
> Data sent via body. (Schema for body at /src/components/kanji/kanji.ts)
> **JWT required in headers.**
- /:id (**DELETE**)
> Deletes a kanji by id.
> **JWT required in headers.**
- /push/:id (**PATCH**)
> **Depracated.**
> Pushes a new pronunciation or meaning to an existant kanji via id.
> **JWT required in headers.**
- /pull/:id (**PATCH**)
> **Depracated.**
> Pulls pronunciations or meanings from a kanji via id.
> **JWT required in headers.**

## /words

- / (**GET**)
> Returns a list of words. 
> Accepts query params. (Schema for query params at /src/components/words/word.ts)
- / (**POST**)
> Creates a new word.
> Data sent via body. (Schema for body at /src/components/words/word.ts)
> **JWT required in headers.**
- /:id (**GET**)
> Returns a single word by id.
- /:id (**PATCH**)
> Updates a word by id.
> Data sent via body. (Schema for body at /src/components/words/word.ts)
> **JWT required in headers.**
- /:id (**DELETE**)
> Deletes a word by id.
> **JWT required in headers.**
- /push/:id (**PATCH**)
> **Depracated.**
> Pushes a new pronunciation or meaning to an existant word via id.
> **JWT required in headers.**
- /pull/:id (**PATCH**)
> **Depracated.**
> Pulls pronunciations or meanings from a word via id.
> **JWT required in headers.**

## /play

- /guess (**POST**)
> Returns random kanjis and words.
> A quantity must be specified via body.
- /pairs (**POST**)
> Returns random kanjis and words.
> A quantity must be specified via body.