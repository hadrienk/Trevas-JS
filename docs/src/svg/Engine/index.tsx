import React from 'react';

const Engine = ({ color = 'black', ...rest }: any) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="30px"
		height="30px"
		viewBox="0 0 122.88 120.5"
		{...rest}
	>
		<g>
			<path
				fill={color}
				d="M64.82,68.27l48.4,0.8c0,17.19-8.55,33.26-22.81,42.86L64.82,68.27L64.82,68.27z M59.99,59.92L59.44,3.63 L59.41,0l3.61,0.25h0.01h0.01c4.56,0.32,8.98,1.12,13.21,2.33c4.23,1.21,8.29,2.86,12.13,4.87c19.67,10.34,33.27,30.56,34.34,54.02 l0.16,3.61l-3.61-0.11l-56.02-1.72l-3.23-0.1L59.99,59.92L59.99,59.92z M66.19,7.33l0.48,49.31l49.06,1.5 c-2.1-19.45-13.88-36.02-30.48-44.74c-3.41-1.79-7.04-3.26-10.84-4.35C71.74,8.28,69,7.71,66.19,7.33L66.19,7.33z M55.19,65.31 l27.6,47.8c-8.38,4.84-17.92,7.39-27.6,7.39C24.71,120.5,0,95.78,0,65.31c0-29.57,23.31-53.9,52.86-55.14L55.19,65.31L55.19,65.31z"
			/>
		</g>
	</svg>
);

export default Engine;