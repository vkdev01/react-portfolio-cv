import React from "react";
// import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
	faServer
 } from "@fortawesome/free-solid-svg-icons";

import {
	faGithub
} from "@fortawesome/free-brands-svg-icons";

import "./styles/project.css";

const Project = (props) => {
	const { logo, title, description, gitlink, livelink} = props;

	return (
		<React.Fragment>
			<div className="project">
					<div className="project-container">
						<div className="project-logo">
							<img src={logo} alt="logo" />
						</div>
						<div className="project-title">{title}</div>
						<div className="project-description">{description}</div>
						<div className="project-link">
							<div className="project-link-icon">
								<a
									href={gitlink}
									target="_blank"
									rel="noreferrer"
								>
									<FontAwesomeIcon
										icon={faGithub}
										className="homepage-social-icon"
									/>
								</a>
								<a
									href={livelink}
									target="_blank"
									rel="noreferrer"
								>
									<FontAwesomeIcon
										icon={faServer}
										className="homepage-social-icon"
									/>
								</a>
							</div>
						</div>
					</div>
			</div>
		</React.Fragment>
	);
};

export default Project;
