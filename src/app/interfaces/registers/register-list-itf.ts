export interface RegisterListItf {
    "count": number,
    "next": string,
    "previous": string,
    "results": Array<
        {
            "id": number,
            "label": string,
            "_pk": string,
            "date_time": string,
            "id_user_isis": number,
            "observations": string,
            "diagnostic_type": {
                "id": string,
                "label": string
            },
            "patient": {
                "id": number,
                "label": string
            },
            "doctor": {
                "id": number,
                "label": string
            },
            "company": {
                "id": number,
                "label": string
            },
            "branch": {
                "id": number,
                "label": string
            },
            "diagnostic_classification": {
                "id": number,
                "label": string
            }
        }
    >
}
