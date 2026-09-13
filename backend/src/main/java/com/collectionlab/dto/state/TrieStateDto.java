package com.collectionlab.dto.state;

import java.util.Map;

public class TrieStateDto {

    public static class TrieNodeDto {
        private String ch;
        private boolean isEndOfWord;
        private Map<String, TrieNodeDto> children;

        public TrieNodeDto(String ch, boolean isEndOfWord, Map<String, TrieNodeDto> children) {
            this.ch = ch;
            this.isEndOfWord = isEndOfWord;
            this.children = children;
        }

        public String getCh() { return ch; }
        public boolean isEndOfWord() { return isEndOfWord; }
        public Map<String, TrieNodeDto> getChildren() { return children; }
    }

    private TrieNodeDto root;
    private int wordCount;

    public TrieStateDto(TrieNodeDto root, int wordCount) {
        this.root = root;
        this.wordCount = wordCount;
    }

    public TrieNodeDto getRoot() { return root; }
    public int getWordCount() { return wordCount; }
}
