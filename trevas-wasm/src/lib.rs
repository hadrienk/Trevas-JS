use wasm_bindgen::prelude::*;

mod dataset;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

macro_rules! console_log {
    // Note that this is using the `log` function imported above during
    // `bare_bones`
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

#[wasm_bindgen]
pub fn execute_aggr_sum(values: &[f64]) -> f64 {
    console_log!("values in rust {:?}", values);
    let sum = values.iter().sum();
    console_log!("sum in rust {}", sum);
    sum
}
