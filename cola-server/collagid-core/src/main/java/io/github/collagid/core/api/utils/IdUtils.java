package io.github.collagid.core.api.utils;

import java.util.Random;

public class IdUtils {
    private static final String CHARACTERS = "abcdefghijkl0123456789mnopqrstuvwxyz";
    private static final Random random = new Random();

    public static String generateId(String prefix, int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            sb.append(CHARACTERS.charAt(randomIndex));
        }
        return sb.toString();
    }

    public static String getDstId() {
        return generateId("dst_", 8);
    }

    public static String getViewId() {
        return generateId("vie_", 8);
    }

    public static String getChunkId() {
        return generateId("chu_", 8);
    }

    public static String getFieldId() {
        return generateId("field_", 8);
    }

    public static String getRecordId() {
        return generateId("rec_", 8);
    }

}
