package io.github.collagid.core.api;

import edu.princeton.cs.algorithms.BTree;
import edu.princeton.cs.introcs.StdOut;

import java.util.Set;

public class BTr {
    public static void main(String[] args) {
        BTree<String, String> st = new BTree<String, String>();
    }

    public static class RecordSet implements Comparable{
        private String recordId;
        private String subRecordId;
        public Set<String> branch;

        @Override
        public int compareTo(Object o) {
            return 0;
        }
    }
}
