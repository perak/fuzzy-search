# fuzzy-search

Fuzzy text searching plugin for Meteor based on Levenshtein distance algorithm. You can use it to implement "Did you mean..." feature in your program (and more).

Function `mostSimilarString` searches given cursor for search string and returns the most similar one.
If you have "beer", "juice" and "milk" searching for string "bear" will return "beer".
This also works with multiple words: if you search for "Nors Chuk" you will get "Chuck Norris".

## How to install 
1. `meteor add perak:fuzzy-search`

## How to use

Function searches given cursor for search string and returns the most similar one.

#### Syntax:

```javascript
mostSimilarString(cursor, fieldName, searchString, maxDistance, caseSensitive)
```


#### Arguments:

**cursor** meteor cursor object

* data type: object
* default value: *none*

**fieldName** field name to search in

* data type: string
* default value: *none*

**searchString** string to search

* data type: string
* default value: *none*

**maxDistance** is used to limit result to less-or-more similar string in small datasets

* data type: integer
* default value: -1
* -1 means "auto". Function will automaticaly set max_distance based on search_string.
* undefined means "no limit". Searching for string "beer" can return a "wife". We don't want that! :)

**caseSensitive**

* data type: bool
* default value: false

#### Return value:

Function will return most similar word or empty string if similar word is not found (if best word distance is greater than max_distance).

#### Example:

```javascript
// If we have a collection named "Drinks" which contains "beer", "juice" and "milk"

var searchString = "bear"; // user typed "bear" instead of "beer"

// search "Drinks" collection for string "bear"
var someCursor = Drinks.find({ drink_name: searchString });

// "bear" is not found, so we want to find most similar word to give user suggestion (Did you mean...)
if(someCursor.count() == 0)
{
	// expose entire collection
	var tempCursor = Drinks.find({ }, { drink_name: true });

	// find most similar string
    var bestWord = mostSimilarString(tempCursor, "drink_name", searchString, -1, false);

    // in this example, bestWord is "beer", show user a suggestion: "Did you mean beer?"
    // ...
}
```

##History

####0.1.9
* Field name now can be in "dot notation", e.g. "data.name". Thanks to <a href="https://github.com/H3llT0uCh" target="_blank">Tiago</a>.

####0.1.8
* Added case-insensitive search

##Contribute

Feel free to report issues, request features, performance improvements etc.

##License
MIT
