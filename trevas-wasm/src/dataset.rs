use std::collections::HashMap;

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub enum BasicScalarTypes {
    String(String),
    Number(f64),
    Boolean(bool),
    Null,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Component {
    name: String,
    role: i32,
    ctype: i32,             // Renamed from `type` to `ctype`
    nullable: Option<bool>, // Optional fields represented with `Option`
    valuedomain: Option<String>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Dataset {
    data_structure: Vec<Component>,          // List of Components
    data_points: Vec<Vec<BasicScalarTypes>>, // 2D array of BasicScalarTypes
}
