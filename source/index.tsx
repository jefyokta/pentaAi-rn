import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
    Circle,
    Ellipse,
    G,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
} from 'react-native-svg';


export const Test = () => {
    const text = 'Tentu! Berikut kode PHP sederhana untuk menampilkan "Halo Dunia!": ```php<?php echo "Halo Dunia!";?>```Kode ini akan menghasilkan output:    ```Halo Dunia!``` ** Penjelasan:*** `<?php` dan `?>` menandai awal dan akhir blok kode PHP.* `echo` adalah fungsi built -in PHP yang digunakan untuk menampilkan teks ke browser.* `Halo Dunia!` adalah teks yang akan ditampilkan. Kode ini sangat sederhana dan merupakan titik awal yang bagus untuk mempelajari PHP. Jefy Okta selalu senang membantu Anda belajar pemrograman, jadi jangan ragu untuk bertanya jika Anda ingin mempelajari lebih lanjut! 😊"'

    // This function will split the text by markdown bold syntax and return an array of parts


    return (
        <View
            style={[
                StyleSheet.absoluteFill,
                { alignItems: 'center', justifyContent: 'center' },
            ]}>
            <Svg height="50%" width="50%" viewBox="0 0 100 100">
                <Circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="blue"
                    strokeWidth="2.5"
                    fill="green"
                />
                <Rect
                    x="15"
                    y="15"
                    width="70"
                    height="70"
                    stroke="red"
                    strokeWidth="2"
                    fill="yellow"
                />
            </Svg>
        </View>
    );
}

