// Levenshtein Distance
function levenshteinDistance(strA, strB, limit) {
	var strALength = strA.length, strBLength = strB.length;

	var max_len = 0;
	if(strALength > strBLength)
		max_len = strALength + 1;
	else
		max_len = strBLength + 1;

	var matrix = [];
	for (var i = 0; i < max_len; i++) {
		matrix[i] = [i];
		matrix[i].length = max_len;
	}
	for (var i = 0; i < max_len; i++) {
		matrix[0][i] = i;
	}

	if (Math.abs(strALength - strBLength) > (limit || 32)) return limit || 32;
	if (strALength === 0) return strBLength;
	if (strBLength === 0) return strALength;

	// Calculate matrix
	var strA_i, strB_j, cost, min, t;
	for (i = 1; i <= strALength; ++i) {
		strA_i = strA[i-1];

		for (j = 1; j <= strBLength; ++j) {
			if (i === j && matrix[i][j] > 4) return strALength;

			strB_j = strB[j-1];
			cost = (strA_i === strB_j) ? 0 : 1;
			// Calculate the minimum (much faster than Math.min(...)).
			min    = matrix[i - 1][j    ] + 1;                      // Deletion.
			if ((t = matrix[i    ][j - 1] + 1   ) < min) min = t;   // Insertion.
			if ((t = matrix[i - 1][j - 1] + cost) < min) min = t;   // Substitution.

			matrix[i][j] = min;     // Update matrix.
		}
	}

	return matrix[strALength][strBLength];
};

// Receives two array of words and calculates distances between all words
// return sum of first n smallest distances where n = number of words in arrayA
function levenshteinDistanceExt(arrayA, arrayB)
{
	// create array of distances between all words
	var arrayC = [];
	var c = 0;
	for(var a = 0; a < arrayA.length; a++)
	{
		for(var b = 0; b < arrayB.length; b++)
		{
			arrayC[c] = levenshteinDistance(arrayA[a], arrayB[b]);
			c++;    			
		}
	}
	// sort array
	arrayC.sort();

	// sum of arrayA.length best matches
	var result = 0;
	for(var i = 0; i < arrayA.length; i++)
		result = result + arrayC[i];
	return result;
}

// function searches given cursor for search string and returns most similar string.
// maxDistance parameter is used to limit results to less-or-more similar words in small datasets
//   -1 means "auto". Function will auto set maxDistance based on searchString.
//   undefined means "no limit". Searching for string "beer" can return a "wife" (we don't want that).
mostSimilarString = function(cursor, fieldName, searchString, maxDistance, caseSensitive)
{
	if(searchString == "")	return "";

	var min_distance = 9999;
	var best_word = "";

	if(typeof(caseSensitive) == "undefined") caseSensitive = false;
	if(!caseSensitive) searchString = searchString.toUpperCase();

	// split searchString into words
	var arrayA = searchString.split(" ");

	if(typeof(maxDistance) == "undefined") maxDistance = 9999;
	if(maxDistance < 0)
	{
		// auto set maxDistance: longest word * number of words * 0.7
		// Btw, I got 0.7 with trial-and-error method
		var longest_word = 0;
		arrayA.forEach(function(str) {
			if(str.length > longest_word)
				longest_word = str.length;
		});
		maxDistance = Math.ceil(longest_word * arrayA.length * 0.7);
	}

	cursor.forEach(function(doc) {
		var candidate = doc[fieldName];
		if(!caseSensitive) candidate = candidate.toUpperCase();
		// split string into words
		var arrayB = candidate.split(" ");
		// calculate sum distance
		// if both strings are single words return simple distance
		var dist = 0;
		if(arrayA.length <= 1 && arrayB.length <= 1)
			dist = levenshteinDistance(searchString, candidate);
		else
			dist = levenshteinDistanceExt(arrayA, arrayB);

		if(dist < min_distance && dist < maxDistance)
		{
			min_distance = dist;
			best_word = doc[fieldName];
		}
	});

	return best_word;
}
