package io.github.collagid.core.api.utils;


import java.math.BigDecimal;

public class OrderIndexGenerator {

    /**
     * This is an example method.
     *
     * <p>Here is an example of how to use this method:</p>
     *
     * <pre>
     * {@code
     * // Create a new instance of the class
     * MyClass obj = new MyClass();
     *
     * // Call the example method
     * obj.exampleMethod("Hello, world!");
     * }
     * </pre>
     *
     * @param message The message to display.
     */
    public void exampleMethod(String message) {
        System.out.println(message);
    }



    /**
     * Generates a new sort index based on the previous index, next index, and default expansion scale.
     * If both prevIndex and nextIndex are null, returns a default minimum index.
     *
     * @param prevIndex    The previous index as a String.
     * @param nextIndex    The next index as a String.
     * @return             The new sort index as a String.
     */
    public static String getNewSortIndex(String prevIndex, String nextIndex) {
        return getNewSortIndex(prevIndex, nextIndex, 3);
    }


    /**
     * Generates a new sort index based on the previous index, next index, and specified expansion scale.
     * Handles cases where prevIndex or nextIndex is null, and adjusts the index accordingly.
     *
     * @param prevIndex    The previous index as a String.
     * @param nextIndex    The next index as a String.
     * @param expandScale  The scale by which to expand the index if necessary.
     * @return             The new sort index as a String.
     */
    public static String getNewSortIndex(String prevIndex, String nextIndex, int expandScale) {
        BigDecimal prevValue = (prevIndex != null) ? new BigDecimal(prevIndex) : null;
        BigDecimal nextValue = (nextIndex != null) ? new BigDecimal(nextIndex) : null;

        if (prevValue == null && nextValue == null) {
            return BigDecimal.ONE.divide(BigDecimal.TEN.pow(expandScale)).toPlainString();
        }

        BigDecimal increase = BigDecimal.ONE.divide(BigDecimal.TEN.pow(Math.max(
                (prevValue != null) ? prevValue.scale() : 0,
                (nextValue != null) ? nextValue.scale() : 0
        )));

        if (nextValue == null) {
            nextValue = prevValue.add(increase);
            if (nextValue.compareTo(BigDecimal.ONE) == 0) {
                increase = BigDecimal.ONE.divide(BigDecimal.TEN.pow(prevValue.scale() + expandScale));
                return prevValue.add(increase).toPlainString();
            }
            return nextValue.toPlainString();
        }

        if (prevValue == null) {
            prevValue = nextValue.subtract(BigDecimal.ONE.divide(BigDecimal.TEN.pow(nextValue.scale())));
            if (prevValue.compareTo(BigDecimal.ZERO) == 0) {
                increase = BigDecimal.ONE.divide(BigDecimal.TEN.pow(nextValue.scale() + 1));
                return nextValue.subtract(increase).toPlainString();
            }
            return prevValue.toPlainString();
        }

        increase = BigDecimal.ONE.divide(BigDecimal.TEN.pow(Math.max(prevValue.scale(), nextValue.scale())));
        if (prevValue.add(increase).compareTo(nextValue) == 0) {
            increase = BigDecimal.ONE.divide(BigDecimal.TEN.pow(prevValue.scale() + expandScale)).multiply(new BigDecimal("500"));
        }

        return prevValue.add(increase).toPlainString();
    }
}

