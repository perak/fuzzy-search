# fuzzy-search

Fuzzy text searching plugin for Meteor based on Levenshtein distance algorithm.

## How to install 
1. `npm install -g meteorite` (if not already installed)
2. Inside your project directory: `mrt add fuzzy-search`

## How to use
Function `mostSimilarString(cursor, field_name, search_string, max_distance)` searches given cursor for search_string and returns most similar one.

Example:

    // If we have collection named "Drinks" which contains "beer", "juice" and "milk"
    // search "Drinks" collection for string "bear"
    var some_cursor = Drinks.find({ drink_name: "bear" });

    // "bear" is not found, so we want to find most similar word to give user suggestion (Did you mean...)
    if(some_cursor.count() == 0)
    {
        var best_word = mostSimilarString(some_cursor, "drink_name", "bear", -1);

        // in this example, best_word is "beer", show user a suggestion: "Did you mean beer?"
        // ...
    }

