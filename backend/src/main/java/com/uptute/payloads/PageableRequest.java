package com.uptute.payloads;

import lombok.*;

@Getter
@AllArgsConstructor
@ToString
public class PageableRequest {
    private int page;
    private int itemsPerPage;
}
