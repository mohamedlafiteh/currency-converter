export interface Currency {
    id: number,
    name: string,
    short_code: string,
    code: string,
    precision: number,
    subunit: number,
    symbol: string,
    symbol_first: true,
    decimal_mark: string,
    thousands_separator: string
}

export interface ConversionResult {
    meta:Meta ,
    response:ConversionResponse,
    timestamp: number,
    date: string,
    from: string,
    to: string,
    amount: number,
    value: number
}
export interface Meta
{
        code: number,
        disclaimer: string

}
export interface ConversionResponse{
        timestamp: number,
        date: string,
        from: string,
        to: string,
        amount: number,
        value: number
}
