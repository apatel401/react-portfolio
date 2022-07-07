import React from "react";
import Tooltip from "./Tooltip";

const Paragraph = () => {
	return (
		<div role="presentation">
			<p>
				Testing dolor sit amet, Vivayus adipiscing elit. Vivamus ut quam consectetur, tempus ne
				que ac, iaculis ipsum. Aliquam dolor nulla, mollis quam eget, gravida{" "}
				<Tooltip definition="Vivamus ut quam consectetur, tempus negue ac, iaculis ipsum. Aliquam dolor nulla, mollis quis">
					porttitor
				</Tooltip>{" "}
				liber mollis
			</p>

			<p>
				o. Maecenas at{" "}
				<Tooltip definition="Nam quis nulla. Integer malesuada. In in enim a ar">
					consectetur ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut
					quam consectetur, tempus neque ac, iaculis ipsum.
				</Tooltip>{" "}
				Aliquam dolor nulla, mollis quis quam eget, gravida porttitor libero. Maecenas at
				consectetur e. vayous nas at consectetur ex. Lorem dolor sit amet, co nsectetur
				adipiscing elit. Vivamus ut quam consectetur, tempus neque ac, iaculis ipsum. Aliquam
				dolor{" "}
				<Tooltip
					definition="Nam quis nulla. Integer malesuada. In in enim ag ar"
					direction="down"
				>
					ipsum
				</Tooltip>{" "}
				nulla, mollis quis quam eget, gravida porttitor libero. Maecenas at consectetur ex
				gravida porttitor
			</p>
		</div>
	);
};

export default Paragraph;
