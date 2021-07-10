package com.uptute.domain;

import java.util.ArrayList;

import com.uptute.payloads.PageableRequest;
import com.uptute.payloads.PageableResponse;

public class Pageable<T> {
    private int page;
    private int itemsPerPage;

    public Pageable(PageableRequest request){
         page = request.getPage();
         itemsPerPage = request.getItemsPerPage();
    }

    public <K> ArrayList<K> getClampedArray(ArrayList<K> sortedArray){
        int from = page * itemsPerPage;
        int to = from + itemsPerPage;
        return new ArrayList<>(sortedArray.subList(from, to));
    }

    public PageableResponse<T> toResponse(ArrayList<T> clampedArray){
        int length = clampedArray.size() / itemsPerPage;
        return new PageableResponse<T>(page, itemsPerPage, length, clampedArray);
    }
}
