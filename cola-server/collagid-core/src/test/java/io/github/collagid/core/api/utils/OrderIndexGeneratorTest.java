package io.github.collagid.core.api.utils;


import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class OrderIndexGeneratorTest{

    @Test
    public void testGetNewSortIndexWithNullPrevAndNextIndex() {
        String result = OrderIndexGenerator.getNewSortIndex(null, null);
        assertEquals("0.001", result, "Expected index is 0.001 when both prevIndex and nextIndex are null");
    }

    @Test
    public void testNesIndexOfAfter0_999() {
        String result = OrderIndexGenerator.getNewSortIndex("0.999", null);
        assertEquals("0.999001", result, "Expected index is 0.999001 when pre index is 0.999");
    }

    @Test
    public void testGetNewSortIndexWithOnlyPrevIndex() {
        String result = OrderIndexGenerator.getNewSortIndex("0.123", null);
        assertEquals("0.124", result, "Expected index is 0.124 when nextIndex is null and prevIndex is 0.123");
    }

    @Test
    public void testGetNewSortIndexWithOnlyNextIndex() {
        String result = OrderIndexGenerator.getNewSortIndex(null, "0.123");
        assertEquals("0.122", result, "Expected index is 0.122 when prevIndex is null and nextIndex is 0.123");
    }

    @Test
    public void testGetNewSortIndexWithPrevAndNextIndex() {
        String result = OrderIndexGenerator.getNewSortIndex("0.123", "0.125");
        assertEquals("0.124", result, "Expected index is 0.124 when prevIndex is 0.123 and nextIndex is 0.125");
    }

    @Test
    public void testGetNewSortIndexWithPrevIndexCausingExpansion() {
        String result = OrderIndexGenerator.getNewSortIndex("0.999", null);
        assertEquals("0.999001", result, "Expected index is 0.999001 when nextIndex is null and prevIndex is 0.999");
    }

    @Test
    public void testGetNewSortIndexWithNextIndexCausingExpansion() {
        String result = OrderIndexGenerator.getNewSortIndex(null, "0.001");
        assertEquals("0.0009", result, "Expected index is 0.000999 when prevIndex is null and nextIndex is 0.001");
    }

    @Test
    public void testGetNewSortIndexWithCloseValuesCausingExpansion() {
        String result = OrderIndexGenerator.getNewSortIndex("0.123", "0.124");
        assertEquals("0.123500", result, "Expected index is 0.123500 when prevIndex is 0.123 and nextIndex is 0.124");
    }
}