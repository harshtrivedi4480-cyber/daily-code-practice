var twoEditWords = function(queries, dictionary) {
    const result = [];

    for (const query of queries) {
        for (const word of dictionary) {
            let differences = 0;

            for (let i = 0; i < query.length; i++) {
                if (query[i] !== word[i]) {
                    differences++;
                }

                // More than 2 edits are not allowed
                if (differences > 2) {
                    break;
                }
            }

            // This query can become the dictionary word
            // using at most 2 edits
            if (differences <= 2) {
                result.push(query);
                break;
            }
        }
    }

    return result;
};