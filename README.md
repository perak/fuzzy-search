# fuzzy-search

Fuzzy text searching plugin for Meteor based on Levenshtein distance algorithm.

Function `mostSimilarString` searches given cursor for search_string and returns the most similar one.
If you have "beer", "juice" and "milk" searching for string "bear" will return "beer".
This also works with multiple words: if you search for "Nors Chuk" you will get "Chuck Norris".

## How to install 
1. `npm install -g meteorite` (if not already installed)
2. Inside your project directory: `mrt add fuzzy-search`

## How to use
Function `mostSimilarString(cursor, field_name, search_string, max_distance)` searches given cursor for search_string and returns the most similar one.

Example:

    // If we have a collection named "Drinks" which contains "beer", "juice" and "milk"

    var search_string = "bear"; // user typed "bear" instead of "beer"

    // search "Drinks" collection for string "bear"
    var some_cursor = Drinks.find({ drink_name: search_string });

    // "bear" is not found, so we want to find most similar word to give user suggestion (Did you mean...)
    if(some_cursor.count() == 0)
    {
    	// expose entire collection
    	some_cursor = Drinks.find({ });

    	// find most similar string
        var best_word = mostSimilarString(some_cursor, "drink_name", search_string, -1);

        // in this example, best_word is "beer", show user a suggestion: "Did you mean beer?"
        // ...
    }

Parameter "max_distance" is used to limit result to less-or-more similar string in small datasets
* -1 means "auto". Function will automaticaly set max_distance based on search_string.
* undefined means "no limit". Searching for string "beer" can return a "wife". We don't want that! :)


##TODO
Function is case-sensitive, it should be case-insensitive, I'l change it soon.