package com.uptute.domain;

import java.util.ArrayList;

import com.uptute.payloads.PageableQueryParams;
import com.uptute.payloads.PageableResponse;

public class Pageable<T> {
    private int page;
    private int itemsPerPage;

    public Pageable(PageableQueryParams request) {
        page = request.getPage();
        itemsPerPage = request.getItemsPerPage();
    }

    public <K> ArrayList<K> getClampedArray(ArrayList<K> sortedArray) {
        if (sortedArray.size() == 0)
            return new ArrayList<>();
        int maxIndex = sortedArray.size();
        int from = page * itemsPerPage;
        if (from > maxIndex) {
            page--;
            return getClampedArray(sortedArray);
        }
        int to = from + itemsPerPage;
        if (to > maxIndex)
            to = maxIndex;
        return new ArrayList<>(sortedArray.subList(from, to));
    }

    public PageableResponse<T> toResponse(ArrayList<T> clampedArray, int size) {
        int length = (int) Math.ceil((double) size / itemsPerPage);
        return new PageableResponse<T>(page, itemsPerPage, length, clampedArray);
    }
}
