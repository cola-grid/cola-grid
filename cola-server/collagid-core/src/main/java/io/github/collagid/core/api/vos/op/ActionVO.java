package io.github.collagid.core.api.vos.op;

import java.util.List;
import java.util.Map;

public class ActionVO {
    private String n;
    private List<String> p;
    private List<Map<String, Object>> oi;

    // Getters and Setters
    public String getN() {
        return n;
    }

    public void setN(String n) {
        this.n = n;
    }

    public List<String> getP() {
        return p;
    }

    public void setP(List<String> p) {
        this.p = p;
    }

    public List<Map<String, Object>> getOi() {
        return oi;
    }

    public void setOi(List<Map<String, Object>> oi) {
        this.oi = oi;
    }
}
