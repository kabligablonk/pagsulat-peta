from manim import *

class CreateCircle(Scene):
    def construct(self):
        t = Text("AAM's").scale(0.75).set_color(YELLOW_B)
        circle = Circle(stroke_color=YELLOW_A)  
        self.play(Create(circle), run_time=2)
        self.play(Write(t), run_time=0.4)
        self.wait()


        radius = 3
        new_circle = circle.copy().scale(radius)
        self.play(Transform(
            circle, 
            new_circle, 
            rate_functions=smooth,
            run_time=2)
            ) 
        new_t = Text("Pagsulat \n Portfolio").scale(1.4).set_color(YELLOW_B)
        self.play(ReplacementTransform(t, new_t), rate_functions=smooth, run_time=2)
        self.play(Uncreate(circle), run_time=2)
        self.play(Uncreate(new_t), run_time=0.5)
        self.wait()
