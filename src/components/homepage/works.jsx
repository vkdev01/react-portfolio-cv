import React from "react";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

import Card from "../common/card";

import "./styles/works.css";

const Works = () => {
	return (
		<div className="works">
			<Card
				icon={faBriefcase}
				title="Work"
				body={
					<div className="works-body">
						<div className="work">
							<img
								src="./gfg.png"
								alt="twitter"
								className="work-image"
							/>
							<div className="work-title">GeeksForGeeks</div>
							<div className="work-subtitle">
								Technical Content Intern
							</div>
							<div className="work-duration">Jan 2021 - Mar 2021</div>
						</div>

						<div className="work">
							<img
								src="./cts.png"
								alt="facebook"
								className="work-image"
							/>
							<div className="work-title">Cognizant Technology Solutions</div>
							<div className="work-subtitle">
								Data Analysts
							</div>
							<div className="work-duration">July 2019 - Dec 2019</div>
						</div>
						
					</div>
				}
			/>
		</div>
	);
};

export default Works;
