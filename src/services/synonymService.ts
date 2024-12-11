interface SynonymMap {
    [key: string]: string[];
}

export class SynonymService {
    private synonymDictionary: SynonymMap = {
        // Semantic domains for synonyms
        "secrets": ["whispers", "hidden truths", "concealed narratives", "undisclosed mysteries"],
        "passion": ["desire", "longing", "ardor", "intensity", "fervor"],
        "time": ["moments", "epochs", "eras", "periods", "intervals"],
        "emotions": ["feelings", "sentiments", "sensations", "inner states"],
        "transformation": ["change", "metamorphosis", "evolution", "shift"],
        "quiet": ["silent", "still", "hushed", "tranquil"],
        "hidden": ["concealed", "obscured", "veiled", "masked"],
        "dancing": ["swirling", "moving", "gliding", "undulating"],
        "flickering": ["wavering", "trembling", "pulsing", "oscillating"],
        "journey": ["voyage", "expedition", "exploration", "passage"],
        "story": ["tale", "narrative", "chronicle", "saga"],
        "layers": ["depths", "dimensions", "nuances", "strata"],
        "desire": ["yearning", "craving", "longing", "aspiration"],
        "love": ["affection", "devotion", "attachment", "fondness"],
        "dilemma": ["conflict", "predicament", "quandary", "uncertainty"],
        "whispers": ["murmurs", "hushed utterances", "soft-spoken secrets", "subtle hints", "delicate breathings", "muted revelations"],
        "shadows": ["silhouettes", "dark outlines", "phantom shapes", "obscure forms", "penumbral regions", "dim reflections"],
        "taste": ["flavor", "essence", "sensation", "experience", "hint", "nuance"],
        "forbidden": ["prohibited", "taboo", "illicit", "restricted", "off-limits", "contraband"],
        "beneath": ["under", "below", "underneath", "submerged", "underlying", "hidden within"],
        "echoes": ["reverberations", "resonances", "reflections", "repetitions", "lingering sounds", "persistent memories"],
        "embers": ["sparks", "glowing coals", "dying flames", "residual heat", "smoldering remains", "latent passion"],
        "seduction": ["allure", "enticement", "temptation", "attraction", "charm", "romantic persuasion"]
    };

    // Get synonyms for a given word
    getSynonyms(word: string): string[] {
        const lowercaseWord = word.toLowerCase();

        const directSynonyms = this.synonymDictionary[lowercaseWord] || [];

        const reverseMatches = Object.entries(this.synonymDictionary)
            .filter(([_, synonyms]) => synonyms.includes(lowercaseWord))
            .map(([key]) => key);

        return [...new Set([...directSynonyms, ...reverseMatches, lowercaseWord])];
    }

    expandSearchQuery(query: string): string[] {
        const words = query.toLowerCase().split(/\s+/);
        const expandedQueries: string[] = [];

        const generateCombinations = (currentCombo: string[], remainingWords: string[]) => {
            if (remainingWords.length === 0) {
                expandedQueries.push(currentCombo.join(' '));
                return;
            }

            const currentWord = remainingWords[0];
            const synonyms = this.getSynonyms(currentWord);

            synonyms.forEach(synonym => {
                generateCombinations(
                    [...currentCombo, synonym],
                    remainingWords.slice(1)
                );
            });
        };

        generateCombinations([], words);

        return [...new Set(expandedQueries)];
    }
}