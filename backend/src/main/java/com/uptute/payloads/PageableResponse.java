package com.uptute.payloads;

import java.util.ArrayList;

import lombok.*;

@Getter
@AllArgsConstructor
@ToString
public class PageableResponse<T> {
   private int page;
   private int itemsPerPage;
   private int pagesCount;
   private ArrayList<T> items;
}