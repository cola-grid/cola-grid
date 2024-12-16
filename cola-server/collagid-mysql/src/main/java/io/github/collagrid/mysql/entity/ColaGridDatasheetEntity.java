package io.github.collagrid.mysql.entity;

import com.mybatisflex.annotation.Id;
import com.mybatisflex.annotation.KeyType;
import com.mybatisflex.annotation.Table;
import io.github.collagid.core.dto.ColaGridDatasheetDto;

import java.time.LocalDateTime;

@Table("cola_grid_datasheet")
public class ColaGridDatasheetEntity {
    @Id(keyType = KeyType.None)
    private String dstId;
    private Long v;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ColaGridDatasheetDto toDto() {
        ColaGridDatasheetDto dto = new ColaGridDatasheetDto();
        dto.dstId = this.dstId;
        dto.v = this.v;
        dto.createdAt = this.createdAt;
        dto.updatedAt = this.updatedAt;
        return dto;
    }

    public String getDstId() {
        return dstId;
    }

    public void setDstId(String dstId) {
        this.dstId = dstId;
    }

    public Long getV() {
        return v;
    }

    public void setV(Long v) {
        this.v = v;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
