import React from "react";
import { faSchool } from "@fortawesome/free-solid-svg-icons";

import Card from "../common/card";

import "./styles/works.css";

const Education = () => {
	return (
		<div className="works">
			<Card
				icon={faSchool}
				title="Education"
				body={
					<div className="works-body">
						<div className="work">
							<img
								src="./mnnit.png"
								alt="twitter"
								className="work-image"
							/>
							<div className="work-title">MNNIT Allahabad, Prayagraj</div>
							<div className="work-subtitle">
								M.Tech, Computer Science
							</div>
							<div className="work-duration"> Aug 2022 - Present</div>
						</div>

						{/*  */}
						
					</div>
				}
			/>
		</div>
	);
};

export default Education;
