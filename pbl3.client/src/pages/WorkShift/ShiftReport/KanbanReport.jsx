import { Card, Col, Row } from "antd";
import React from "react";
import CardItem from "./CardItem";

export default function KanbanReport({ data }) {
    return (
        <div>
            <Row gutter={12}>
                {data &&
                    data.map((item, index) => (
                        <Col key={index} span={8} style={{ margin: "6px 0" }}>
                            <CardItem />
                        </Col>
                    ))}
            </Row>
        </div>
    );
}
